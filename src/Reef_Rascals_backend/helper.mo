import Result "mo:base/Result";
import Random "mo:base/Random";
import Float "mo:base/Float";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Types "Types";

module {

    let rascals : [Types.Rascal] = [
        {
            name = "Phanter";
            health = 100;
            attack = 10;
            rarity = "Common";
            price = 100;
        },
        {
            name = "Mounsan";
            health = 100;
            attack = 10;
            rarity = "Common";
            price = 100;
        },
        {
            name = "Killer";
            health = 100;
            attack = 10;
            rarity = "Rare";
            price = 100;
        },
        {
            name = "popu";
            health = 100;
            attack = 10;
            rarity = "Legendary";
            price = 100;
        }
    ];

    public func getRandomRascal() : async Types.Rascal {
        let index : Nat = Random.rangeFrom(32, await Random.blob());
        let rascal = rascals[index % 4];
        return rascal;
    };
}