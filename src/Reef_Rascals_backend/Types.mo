import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

module {

    public type Rascal = {
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
        rascals : [Rascal];
    };
}