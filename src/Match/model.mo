import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";

module {

    public func newRascal(inputName: Text, inputRarity: Text, inputTribe: Text, inputHealth: Nat, inputAttack: Nat) : Rascal {
        var rascal = {
            name = inputName;
            rarity = inputRarity;
            tribe = inputTribe;
            health = inputHealth;
            attack = inputAttack;
        };

        return rascal;
    };

    public func newUser(inputPrincipal: Principal, inputUsername: Text, inputPassword: Text) : User {
        var user = {
            principal = inputPrincipal;
            username = inputUsername;
            password = inputPassword;
            rank = "Bronze";
            tokens = 0;
            rascals = [];
        };

        return user;
    };

    public type Rascal = {
        name: Text;
        rarity: Text;
        tribe : Text;
        health: Nat;
        attack: Nat;
    };

    public type User = {
        principal: Principal;
        username: Text;
        password: Text;
        rank: Text;
        tokens: Nat;
        rascals: [Rascal];
    };

}