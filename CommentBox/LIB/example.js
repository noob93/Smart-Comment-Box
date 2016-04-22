

var selfEg = angular.module('example', ['ui.mention']);

selfEg.run(function ($rootScope) {
  $rootScope.post = {
    message: 'Hi @'
  };
})

selfEg.directive('mentionExample', function () {
  return {
    require: 'uiMention',
    link: function link($scope, $element, $attrs, uiMention) {
      /**
       * $mention.findChoices()
       *
       * @param  {regex.exec()} match    The trigger-text regex match object
       * @todo Try to avoid using a regex match object
       * @return {array[choice]|Promise} The list of possible choices
       */
      uiMention.findChoices = function (match, mentions) {
        return choices
        // Remove items that are already mentioned
        .filter(function (choice) {
          return !mentions.some(function (mention) {
            return mention.id === choice.id;
          });
        })
        // Matches items from search query
        .filter(function (choice) {
          return ~(choice.first + ' ' + choice.last).indexOf(match[1]);
        });
      };
    }
  };
});

selfEg.controller('testLogic', function($scope){
$scope.comment = [];
$scope.btn_add = function() {
   if($scope.post.message != ''){
    $scope.comment.push($scope.post.message);
    $scope.post.message = "";
      }

}

$scope.remItem = function($index) {
    $scope.comment.splice($index, 1);
}

$scope.ClearCommentBox = function(){
    $scope.post.message = "";
}
});

var choices = [{ first: 'Paru', last: 'Sharma'}, { first: 'Brad', last: 'Pitt'}, { first: 'Silvester', last: 'Stallone'}, { first: 'Tom', last: 'Cruise'}, { first: 'Peter', last: 'Parkar'}, { first: 'Green', last: 'Arrow'}, { first: 'Sheldon', last: 'Cooper'}];





