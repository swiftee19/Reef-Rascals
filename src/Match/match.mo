import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import model "model";

actor {
    let rascal1 = {
        id = "12B9210424B";
        name = "Axolberry";
        owner = Principal.fromText("mt2ii-xbnh3-d2rp7-mchtr-palbc-vkhta-lmew3-h2gag-alvmk-nojqj-dae");
        price = 2.32;
        level = 3;
        attack = 10;
        health = 50;
        speed = 10;
        imageUrl = "/rascals/axolberry.png";
        tribe = "Chubby";
        rarity = "Common";
    };

    let rascal2 = {
        id = "12B92123110B";
        name = "Captain Finbite";
        owner = Principal.fromText("mt2ii-xbnh3-d2rp7-mchtr-palbc-vkhta-lmew3-h2gag-alvmk-nojqj-dae");
        price = 0.22;
        level = 6;
        attack = 40;
        health = 50;
        speed = 20;
        imageUrl = "/rascals/captain-finbite.png";
        tribe = "Fearless";
        rarity = "Epic";
    };

    let rascal3 = {
        id = "12B9213210B";
        name = "Ribble";
        owner = Principal.fromText("mt2ii-xbnh3-d2rp7-mchtr-palbc-vkhta-lmew3-h2gag-alvmk-nojqj-dae");
        price = 1.30;
        level = 2;
        attack = 10;
        health = 50;
        speed = 30;
        imageUrl = "/rascals/ribble.png";
        tribe = "Fearless";
        rarity = "Rare";
    };

    let opponent = {
        id = Principal.fromText("mt2ii-xbnh3-d2rp7-mchtr-palbc-vkhta-lmew3-h2gag-alvmk-nojqj-dae");
        username = "irvin";
        profilePictureUrl = "/Ganyu.jpg";
        dateJoined = "Fri Mar 08 2024 14:23:52 GMT+0700 (Western Indonesia Time)";
        tokens = 0.0;
        rascals = [rascal1, rascal2, rascal3];
        defense = [rascal1, rascal2, rascal3];
        attack = [rascal1, rascal2, rascal3];
        rank = "Bronze";
        battleHistories = [];
        elo = 0;
        raslet = 3;
        rascalFragment = 0;
        lastRasletClaim = "Fri Mar 08 2024 14:23:52 GMT+0700 (Western Indonesia Time)";
    };



    let users = HashMap.HashMap<Principal, model.User>(5, Principal.equal, Principal.hash);
    var rascalMarket:[model.Rascal] = [rascal1, rascal2, rascal3];
    users.put(opponent.id, opponent);

    public func getGacha(rascal : model.Rascal) : async Text {
        var user = users.get(rascal.owner);
        switch(user) {
            case(?user) {
                if(user.rascalFragment < 10) {
                    return "insufficient rascal fragment";
                };

                var newUSer = { user with rascalFragment = user.rascalFragment - 10 };
                let newRscals = Array.append<model.Rascal>(newUSer.rascals, [rascal]);
                newUSer := { newUSer with rascals = newRscals };
                users.put(rascal.owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };

    };

    public func addBalance(id : Principal, amount: Float) : async Text {
        var check: ?model.User = users.get(id);
        switch(check) {
            case(?user) {
                let newUSer = { user with tokens = user.tokens + amount };
                users.put(id, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func getRaslet(id : Principal, amount: Int, lastRaslet: Text) : async Text {
        var check: ?model.User = users.get(id);
        switch(check) {
            case(?user) {
                var find = amount;
                if(7 - user.raslet < amount) {
                    find := 7 - user.raslet;
                };
                var newUSer = { user with raslet = user.raslet + find };
                newUSer := { newUSer with lastRasletClaim = lastRaslet };
                users.put(id, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func exchangeRascal(rascal : model.Rascal) : async Text {
        var user: ?model.User = users.get(rascal.owner);
        switch(user) {
            case(?user) {
                let newRascals = Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id != rascal.id;
                });
                var newUSer = { user with rascals = newRascals };
                newUSer := { newUSer with rascalFragment = user.rascalFragment + 1 };
                users.put(rascal.owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func addRascal(rascal : model.Rascal, owner : Principal) : async Text {
        var check: ?model.User = users.get(owner);
        switch(check) {
            case(?user) {
                let newRascals = Array.append<model.Rascal>(user.rascals, [rascal]);
                let newUSer = { user with rascals = newRascals };
                users.put(owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func setUserAttackRascal(attackRascals : [model.Rascal], owner : Principal) : async Text {
        var check: ?model.User = users.get(owner);
        switch(check) {
            case(?user) {
                let newattackRascal: [model.Rascal] = attackRascals;
                let newUSer = { user with attack = newattackRascal };
                users.put(owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func setUserDefenseRascal(defenseRascals : [model.Rascal], owner : Principal) : async Text {
        var check: ?model.User = users.get(owner);
        switch(check) {
            case(?user) {
                let newDefenseRascal: [model.Rascal] = defenseRascals;
                let newUSer = { user with defense = newDefenseRascal };
                users.put(owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func reward(id : Principal, amount : Int, history: model.BattleHistory) : async Text {
        var check: ?model.User = users.get(id);
        switch(check) {
            case(?user) {
                var newUSer = { user with rascalFragment = user.rascalFragment + amount};
                var newUser2 = { newUSer with raslet = newUSer.raslet - 2};
                var newHistory = Array.append<model.BattleHistory>(user.battleHistories, [history]);
                var newUser3 = { newUser2 with battleHistories = newHistory};
                if(amount > 0) {
                    var newUser4 = { newUser3 with elo = newUser3.elo + 20};
                    users.put(id, newUser4);
                } else {
                    users.put(id, newUser3);
                };
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func retriveRascal(rascal: model.Rascal) : async Text {
        rascalMarket := Array.filter<model.Rascal>(rascalMarket, func (x) {
            x.id != rascal.id;
        });

        var user: ?model.User = users.get(rascal.owner);
        switch(user) {
            case(?user) {
                let newRascals = Array.append<model.Rascal>(user.rascals, [rascal]);
                let newUSer = { user with rascals = newRascals };
                users.put(rascal.owner, newUSer);
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func buyRacal(rascal : model.Rascal, buyer : Principal) : async Text {
        var check: ?model.User = users.get(buyer);
        switch(check) {
            case(?user) {
                var userRascal: [model.Rascal] = Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id == rascal.id;
                });

                if(Array.size(userRascal) > 0) {
                    return "you already have this rascal";
                };

                if(user.tokens < rascal.price) {
                    return "insufficient balance";
                };

                var newRascal = {rascal with owner = buyer};

                let newRascals = Array.append<model.Rascal>(user.rascals, [newRascal]);
                var newUSer = { user with rascals = newRascals};
                newUSer := { newUSer with balance = user.tokens - rascal.price };
                users.put(buyer, newUSer);
                rascalMarket := Array.filter<model.Rascal>(rascalMarket, func (x) {
                    x.id != rascal.id;
                });
                return "success";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func checkRascalStatus (rascal : model.Rascal, userId: Principal) : async Text {
        var check: [model.Rascal] = Array.filter<model.Rascal>(rascalMarket, func (x) {
            x.id == rascal.id;
        });

        if(Array.size(check) > 0) {
            if(check[0].owner == userId) {
                return "owner";
            };
        };

        if(Array.size(check) > 0) {
            return "sale";
        };

        var userCheck: ?model.User = users.get(rascal.owner);
        
        switch(userCheck) {
            case(?user) {
                var userRascal: [model.Rascal] = Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id == rascal.id;
                });

                check := Array.append<model.Rascal>(check, userRascal);

                if(Array.size(userRascal) > 0) {
                    return "notSale";
                };

                return "no rascal found";
            };
            case(null) {
                return "no user found";
            };
        };
    };

    public func getRascal(id : Text, owner:Principal) : async [model.Rascal] {
        var userCheck: ?model.User = users.get(owner);

        var marketCheck: [model.Rascal] = [];

        marketCheck := Array.filter<model.Rascal>(rascalMarket, func (x) {
            x.id == id;
        });

        switch(userCheck) {
            case(?user) {
                var userRascal: [model.Rascal] = [];

                userRascal := Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id == id;
                });

                marketCheck := Array.append<model.Rascal>(marketCheck, userRascal);
                return marketCheck;
            };
            case(null) {
                return marketCheck;
            };
        };
    };

    public func getUser(key : Principal) : async [model.User] {
        var userArray: [model.User] = [];
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?user) {
                userArray := Array.append<model.User>(userArray, [user]);
                return userArray;
            };
            case(null) {
                return userArray;
            };
        };
    };

    public func getAllUser() : async [model.User] {
        var userArray: [model.User] = [];
        for ((key, value) in users.entries()) {
            userArray := Array.append<model.User>(userArray, [value]);
        };
        return userArray;
    };

    public func getOpponents(user: model.User) : async [model.User] {
        var userArray: [model.User] = [];
        for ((key, value) in users.entries()) {
            userArray := Array.append<model.User>(userArray, [value]);
        };
        userArray := Array.filter<model.User>(userArray, func (x) {
            x.id != user.id;
        });
        userArray := Array.filter<model.User>(userArray, func (x) {
            x.defense.size() >= 1;
        });
        return userArray;
    };

    public func register(user: model.User) : async Text {
        var check: ?model.User = users.get(user.id);
        switch(check) {
            case(null) {
                users.put(user.id, user);
                return "success";
            };
            case(?user) {
                return "user already exists";
            };
        };
    };

    public func updateUser(user : model.User) : async Text {
        var check: ?model.User = users.get(user.id);

        switch(check) {
            case(null) {
                return "no user found";
            };
            case(?check) {
                users.put(user.id, user);
                return "success";
            };
        }
    };

    public func sellRascal(rascal : model.Rascal, price: Float) : async Text {
        var check: ?model.User = users.get(rascal.owner);

        switch(check) {
            case(null) {
                return "no user found";
            };
            case(?user) {
                let newRascals = Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id != rascal.id;
                });
                let sellRascal = { rascal with price = price };
                let newUSer = { user with rascals = newRascals };
                users.put(user.id, newUSer  );
                rascalMarket := Array.append<model.Rascal>(rascalMarket, [sellRascal]);
                return "success";
            };
        };
    };

    public func getMarket() : async [model.Rascal] {
        return rascalMarket;
    };

    public func removeFromMarket(rascal : model.Rascal) : async Text {
        rascalMarket := Array.filter<model.Rascal>(rascalMarket, func (x) {
            x.id != rascal.id;
        });
        return "success";
    };

    public func initRascal(key : Principal) : async Text {
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?user) {
                var rascal1: model.Rascal = {
                    id = "Axolberry";
                    name = "Axolberry";
                    owner = key;
                    price = 20;
                    level = 3;
                    attack = 10;
                    health = 30;
                    speed = 10;
                    imageUrl = "/rascals/axolberry.png";
                    tribe = "Chubby";
                    rarity = "Common";
                };

                var rascal2: model.Rascal = {
                    id = "Captain Finbite";
                    name = "Captain Finbite";
                    owner = key;
                    price = 20;
                    level = 6;
                    attack = 10;
                    health = 30;
                    speed = 10;
                    imageUrl = "/rascals/captain-finbite.png";
                    tribe = "Fearless";
                    rarity = "Epic";
                };

                var rascal3: model.Rascal = {
                    id = "Ribble";
                    name = "Ribble";
                    owner = key;
                    price = 20;
                    level = 2;
                    attack = 10;
                    health = 30;
                    speed = 10;
                    imageUrl = "/rascals/ribble.png";
                    tribe = "Fearless";
                    rarity = "Rare";
                };

                let newRascals = Array.append<model.Rascal>(user.rascals, [rascal1, rascal2, rascal3]);
                let newUSer = { user with rascals = newRascals };
                users.put(key, newUSer);
                return "success";
            };
            case(null) {
                return "failed"
            };
        };
    };
};
