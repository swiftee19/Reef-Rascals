import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";

module {

    public class Rascal(inputName: Text, inputRarity: Text, inputTribe: Text, inputHealth: Nat, inputAttack: Nat) {
        var name: Text = inputName;
        var rarity: Text = inputRarity;
        var tribe : Text = inputTribe;
        var health: Nat = inputHealth;
        var attack: Nat = inputAttack;

        public func takedamage(damage: Nat) {
            health := health - damage;
        };
        
        public func damage(rascal: Rascal) {
            rascal.takedamage(attack);
        };
    };

    public class User(inputPrincipal: Principal, inputUsername: Text, inputPassword: Text) {
        var principal: Principal = inputPrincipal;
        var username: Text = inputUsername;
        var password: Text = inputPassword;
        var rank: Text = "Bronze";
        var rascals : [Rascal] = [];

        public func addRascal(rascal: Rascal) {
            rascals := Array.append(rascals, [rascal]);
        }
    };

    public class WatiningRoom() {
        var users: [Principal] = [];

        public func addUser(pricipal: Principal) {
            users := Array.append(users, [pricipal]);
        };

        public func getUser(principal: Principal) : async Result.Result<Principal, Text> {
            var idx : Nat = 0;
            while (idx < Array.size(users)) {
                if (users[idx] == principal) {
                    return #ok(users[idx]);
                };
                idx +=1;
            };
            return #err("User not found");
        };
    } 

}