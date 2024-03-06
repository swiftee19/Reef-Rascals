import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

module {

    public func newUser(inputPrincipal: Principal, inputUsername: Text) : User {
        var user = {
            id = inputPrincipal;
            username = inputUsername;
            rank = "Bronze";
            tokens = 0.0;
            rascals = [];
            defense = [];
            attack = [];
            profilePictureUrl = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
            dateJoined = "2021-01-01";
            battleHistories = [];
            elo = 1000;
            raslet = 0;
            rascalFragment = 0;
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
        owner: Principal;
        price: Float;
    };

    public type User = {
        id: Principal;
        username: Text;
        profilePictureUrl: Text;
        dateJoined: Text;
        tokens: Float;
        rascals: [Rascal];
        defense: [Rascal];
        attack: [Rascal];
        rank: Text;
        battleHistories: [BattleHistory];
        elo : Int;
        raslet : Int;
        rascalFragment: Int;
    };

    public type BattleHistory = {
        id: Text;
        opponent: User;
        result: Text;
        date: Text;
        usedRascal: [Rascal];
        opponentRascal: [Rascal];
    }

}