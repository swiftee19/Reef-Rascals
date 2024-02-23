import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

module {

    public type Rascals = {
        name : Text;
        health : Nat;
        attack : Nat;
        rarity : Text;
        price : Nat;
    };

    public type Account = { 
        owner: Principal;
        email: Text;
        password: Text;
        tokens : Nat;
        rascals : [Rascals];
    };
}