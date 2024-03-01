import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Time "mo:base/Time";

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
            attack = [];
            profilePictureUrl = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
            dateJoined = "2021-01-01";
            battleHistories = [];
            elo = 1000;
            rascalFragment = 0;
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
        profilePictureUrl: Text;
        dateJoined: Text;
        tokens: Float;
        rascals: [Rascal];
        defense: [Rascal];
        attack: [Rascal];
        rank: Text;
        battleHistories: [BattleHistory];
        elo : Int;
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