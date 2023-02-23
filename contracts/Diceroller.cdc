pub contract Diceroller {

    pub event SingleDiceRoll(result: UInt256)
    pub event DiceRollSetResult(result: [UInt256], quantity: UInt256, purpose: String)
    pub event EmitRandomRange(x: UInt256)

    pub resource Generator {
        access(self) var seed: UInt256
        
        init (seed: UInt256) {
            self.seed=seed
            self.g();
            self.g();
            self.g();
        }

        pub fun generate(): UInt256 { 
            return self.g() 
        }

        pub fun g(): UInt256 {
            self.seed = Diceroller.random(seed: self.seed)
            return self.seed
        }

        pub fun ufix64(): UFix64 { 
            let s: UInt256 = self.g()
            return UFix64(s / UInt256.max)
        }

        pub fun range(_ min :UInt256, _ max: UInt256, quantity: UInt256, purpose: String): [UInt256] {
            var count: UInt256 = 0 
            var diceResultSet: [UInt256] = []
            while count != quantity {
                let rangeVal = min + (self.g() % (max - min+ 1))
                diceResultSet.append(rangeVal)
                count = count + 1
                emit SingleDiceRoll(result: rangeVal)
            }
            emit DiceRollSetResult(result: diceResultSet, quantity: quantity, purpose: purpose)
            return diceResultSet
        }

        pub fun pickWeighted(_ choices: [AnyStruct], _ weights: [UInt256]): AnyStruct {
            var weightsRange: [UInt256] = []
            var totalWeight: UInt256 = 0     
            for weight in weights {
                totalWeight = totalWeight + weight
                weightsRange.append(totalWeight)
            } 
            let p = self.g() % totalWeight
            var lastWeight: UInt256 = 0

            for i, choice in choices {    
                if p >= lastWeight && p < weightsRange[i] {
                    return choice 
                }
                lastWeight = weightsRange[i]
            }
            return nil
        }
    
    }

    pub fun create(seed: UInt256): @Generator {
        return <- create Generator(seed: seed)
    }

    pub fun createFrom(blockHeight: UInt64, uuid: UInt64): @Generator {
        let hash = getBlock(at: blockHeight)!.id
        let h: [UInt8] = HashAlgorithm.SHA3_256.hash(uuid.toBigEndianBytes())
        var seed = 0 as UInt256
        let hex : [UInt64] = []
        for byte,i in hash {
            let xor = (UInt64(byte) ^ UInt64(h[i%32]))
            seed = seed << 2
            seed = seed + UInt256(xor)
            hex.append(xor)
        }
        return <- self.create(seed: seed)
    }

    pub fun random(seed: UInt256): UInt256 {
        return self.lcg(modulus: 4294967296, a: 1664525, c: 1013904223, seed: seed)
    }

    pub fun lcg(modulus: UInt256, a: UInt256, c: UInt256, seed: UInt256): UInt256 {
        return (a * seed + c) % modulus
    }
}