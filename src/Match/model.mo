import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";

module {

    public func newUser(inputPrincipal: Principal, inputUsername: Text, inputPassword: Text) : User {
        var user = {
            principal = inputPrincipal;
            username = inputUsername;
            password = inputPassword;
            rank = "Bronze";
            tokens = 0;
            rascals = [];
            defense = [];
            sell = [];
        };

        return user;
    };

    public type Rascal = {
        id: Text;
        name: Text;
        level: Nat;
        imageUrl: Text;
        tribe : Text;
        rarity: Text;
        health: Nat;
        attack: Nat;
        speed: Nat;
        price: Nat;
    };

    public type User = {
        principal: Principal;
        username: Text;
        password: Text;
        rank: Text;
        tokens: Nat;
        rascals: [Rascal];
        defense: [Rascal];
        sell: [Rascal];
    };
}