(function(){
  angular.module('models-market', ['models-company'])
  .factory('Market', function(Company){
    function Market(){
      var self = this;
      angular.extend(this, {
        companies: [],
        products: [],
        books: {
          asks: {},
          bids: {}
        },
        history: {
          price: {},
          asks: {},
          bids: {},
          trades: {},
          profitability: {}
        },
        addCompany: function(data){
          var company = new Company(data, this);
          self.companies.push(company.id);
        },
        bid: function(offer){
          this.books.bids[offer.product].push(offer);
        },
        ask: function(offer){
          this.books.bids[offer.product].push(offer)
        },
        resolveOffers: function(product){
          var bids = this.books.bids[product],
              asks = this.books.asks[product];
          this.shuffle(bids);
          this.shuffle(asks);

          bids.sort(function(a,b){
            if (a.pricePerUnit < b.pricePerUnit) return 1;
            if (a.pricePerUnit > b.pricePerUnit) return -1;
            return 0;
          });
          asks.sort(function(a,b){
            if (a.pricePerUnit > b.pricePerUnit) return 1;
            if (a.pricePerUnit < b.pricePerUnit) return -1;
            return 0;
          });

          var stats = {
            successfulTrades: 0,
            moneyTraded: 0,
            unitsTraded: 0,
            avgPrice: 0,
            numAsks: 0,
            numBids: 0
          };

          var failsafe = 0;

          bids.forEach(function(bid){
            stats.numBids += bid.amount;
          });
          asks.forEach(function(ask){
            stats.numAsks += ask.amount;
          });

          while (bids.length > 0 && asks.length > 0){
            var buyer = bids[0],
            seller = asks[0],
            qtyTraded = Math.min(seller.amount,buyer.amount),
            clearingPrice = (seller.pricePerUnit + buyer.pricePerUnit) / 2;

            if (qtyTraded > 0) {
              seller.amount -= qtyTraded;
              buyer.amount -= qtyTraded;

              this.transferCommodity(commodity, qtyTraded, seller.agentId, buyer.agentId);
              this.transferMoney(qtyTraded * clearingPrice, seller.agentId, buyer.agentId);

              var buyerAgent = this.getAgent(buyer.agentId),
              sellerAgent = this.getAgent(seller.agentId);

              buyerAgent.updatePriceModel(this, 'buy', commodity, true, clearingPrice);
              sellerAgent.updatePriceModel(this, 'sell', commodity, true, clearingPrice);

              //log statistics

              stats.moneyTraded += (qtyTraded * clearingPrice);
              stats.unitsTraded += qtyTraded;
              stats.successfulTrades ++;

            }

            if ( seller.amount === 0) { //seller is out of offered good
              asks.splice(0,1);        //remove offer
              failsafe = 0;
            }
            if ( buyer.amount === 0) { //buyer has bought all he needs
              bids.splice(0,1);       //remove offer
              failsafe = 0;
            }

            failsafe ++;

            if (failsafe > 1000) {
              console.log('something went wrong');
            }
          }

          //reject remaining offers and update price beliefs

          while(bids.length > 0) {
            var buyer = bids[0],
            buyerAgent = this.getAgent(buyer.agentId);

            buyerAgent.updatePriceModel(this,'buy',commodity,false);
            bids.splice(0,1);
          }
          while(asks.length > 0) {
            var seller = asks[0],
            sellerAgent = this.getAgent(seller.agentId);

            sellerAgent.updatePriceModel(this,'sell',commodity,false);
            asks.splice(0,1);
          }

          //update history

          this.history.bids[commodity].push(stats.numBids);
          this.history.asks[commodity].push(stats.numAsks);
          this.history.trades[commodity].push(stats.unitsTraded);

          if ( stats.unitsTraded > 0 ) {
            stats.avgPrice = stats.moneyTraded / stats.unitsTraded;
            this.history.price[commodity].push(stats.avgPrice);
          } else {
            //special case: none were traded this round, use last rounds' avg price
            var arr = this.history.price[commodity];
            stats.avgPrice = arr[arr.length - 1];
            this.history.price[commodity].push(stats.avgPrice);
          }
        },
        shuffle: function(collection) {
          for (var i=0;i<collection.length;i++){
            var ii = (collection.length - 1) - i;
            if (ii > 1) {
              var j = Math.floor(Math.random() * (ii - 1));
              var temp = collection[j];
              collection[j] = collection[ii];
              collection[ii]= temp;
            }
          }
          return collection;
        }
      })


    }

    return Market;
  });
})();