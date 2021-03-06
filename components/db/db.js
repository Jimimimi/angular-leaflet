var db = {
  "countries": [
    {
      "name": "Greece",
      "capital": "Athens",
      "regions": [
        {
          "id": 1,
          "name": "Attica",
          "population": 5000000,
          "growth": 0.01,
          "cities":[
            {
              "name":"Athens",
              "pops":[{
                "poptype":"artisan",
                "amount": 20000
              }]
            }]
        },
        {
          "id": 11,
          "name": "Sterea Ellada",
          "population": 5000000,
          "growth": 0.04
        },
        {
          "id": 0,
          "name": "Anatoliki Makedonia - Ksanthi",
          "population": 5000000,
          "growth": 0.05
        },
        {
          "id": 3,
          "name": "Dytiki Ellada",
          "population": 5000000,
          "growth": 0.01
        },
        {
          "id": 8,
          "name": "Crete",
          "population": 5000000,
          "growth": 0.02
        },
        {
          "id": 6,
          "name": "Ipeiros",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 5,
          "name": "Ionioi Nisoi",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 12,
          "name": "Thessalia",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 4,
          "name": "Dytiki Makedonia",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 7,
          "name": "Kentriki Makedonia",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 10,
          "name": "Peloponnisos",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 13,
          "name": "Voreio Aigaio",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 9,
          "name": "Notio Aigaio",
          "population": 500000,
          "growth": 0.01
        },
        {
          "id": 2,
          "name": "Mount Athos",
          "population": 5000,
          "growth": 0
        }
      ]
    },
    {
      "name": "Albania",
      "capital": "Tirana",
      "regions": []
    }
  ],
  "search":{
    "regionById": function(countryID, regionID){
        var scope = module.exports.countries[countryID].regions;
        for (var i in scope){
            if (scope[i].id === regionID){
                return scope[i]
            }
        }
    }
  },
  "set":{
    "regionById": function(countryID, regionID, data){
        var scope = module.exports.countries[countryID].regions;
        for (var i in scope){
            if (scope[i].id === regionID){
                scope[i] = data;
            }
        }
    }
  }
}