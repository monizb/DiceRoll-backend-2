require("dotenv").config();
const fcl = require("@onflow/fcl");
const apiResponse = require("../helpers/apiResponse");
const { authorizationFunction } = require("../helpers/authorization");

const address = "0228cfaf738ed8f5"

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("flow.network", "testnet")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

const controller = {
  rollDice: async (req, res) => {
    try {
      //generate random number between 1 and 6
      const result = await fcl.send([
        fcl.transaction`
        import Diceroller from 0x0228cfaf738ed8f5
        transaction(number: UInt256, purpose: String) {

          prepare(acct: AuthAccount) {
            let random = UInt256(unsafeRandom())
            let rng <- Diceroller.create(seed: random)
            //acct.save(rng.range(1, 6), to: /storage/randomDiceer)
            log(rng.range(1, 6, quantity:number, purpose: purpose))
            destroy rng
          }
        
          execute {
            log("Saved to resource")
          }
        }
        `,
        fcl.args([
          fcl.arg(req.body.quantity, fcl.t.UInt256),
          fcl.arg(req.body.purpose, fcl.t.String)
        ]),
        fcl.proposer(authorizationFunction),
        fcl.authorizations([authorizationFunction]),
        fcl.payer(authorizationFunction),
      ]);
      console.log(result);
      const transaction = await fcl.tx(result.transactionId).onceSealed();
      apiResponse.successResponse(res, transaction);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
};

module.exports = controller;
