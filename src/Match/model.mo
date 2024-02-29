import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Int "mo:base/Int";

module {

    public func newUser(inputPrincipal: Principal, inputUsername: Text, inputPassword: Text) : User {
        var user = {
            id = inputPrincipal;
            username = inputUsername;
            password = inputPassword;
            rank = "Bronze";
            tokens = 0.0;
            rascals = [];
            defense = [];
        };

        return user;
    };

    public type Rascal = {
        id: Text;
        name: Text;
        level: Int;
        imageUrl: Text;
        tribe : Text;
        rarity: Text;
        health: Int;
        attack: Int;
        speed: Int;
        owner: Principal;
    };

    public type User = {
        id: Principal;
        username: Text;
        password: Text;
        rank: Text;
        tokens: Float;
        rascals: [Rascal];
        defense: [Rascal];
    };

}