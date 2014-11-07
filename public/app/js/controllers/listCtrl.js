(function() {
    "use-strict";
    angular
        .module('twitterListViewer')
        .controller('ListCtrl', function ListCtrl(user, ListService) {
            var vm = this;
            vm.user = user;
            vm.listId = '';
            vm.tweets = [];
            vm.getTweets = getTweets;
            vm.getTweetsByMaxId = getTweetsByMaxId;
            vm.POS = POS;

           
            getLists();
            function getLists() {
                return ListService.getLists()
                    .then(function(data) {
                        vm.lists = data;
                        return vm.lists;
                    });
            }

            function getTweets(list_id, since_id) {
                ListService.getTweets(list_id, since_id)
                    .then(function(data) {
                        if (data.length > 0) {
                            if (since_id && (data[0].id !== vm.tweets[0].id)) {
                                vm.tweets = data.concat(vm.tweets);
                            } else if (vm.listId !== list_id || !vm.tweets) {
                                vm.listId = list_id;
                                vm.tweets = data;
                            }
                        }
                    });
            }

            function getTweetsByMaxId(){
                if(vm.listId){
                    ListService.getTweetsByMaxId(vm.listId, vm.tweets[vm.tweets.length -1].id)
                        .then(function(data){
                           vm.tweets = vm.tweets.concat(data);
                        });
                }
            }

            function POS(){
                alert("HELLO");
            }


            setInterval(function() {
                if (vm.listId) {
                    vm.getTweets(vm.listId, vm.tweets[0].id);
                }
            }, 1000 * 60);

        });
})();
