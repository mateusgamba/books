/**
 * @ngdoc object
 * @name appBooks.BooksCtrl
 * @requires  $scope, $filter
 * @description
 * Crud books.
 */

appBooks.factory('sortBooks', function($filter) {
    var lista = [];
    return function(listBooks, attrSort, operationSort) {
        switch(attrSort) {
            case 1:
                /**
                 *  operationSort = (+)
                 *      title Ascending
                 *      author Ascending
                 *      edition_year Ascending
                 *  operationSort = (-)
                 *      title Descending
                 *      author Ascending
                 *      edition_year Ascending
                 */
                lista = $filter('orderBy')(listBooks, [operationSort+'title', 'author', 'edition_year']);
                break;
            case 2:
                /**
                 *  operationSort = (+)
                 *      author Ascending
                 *      title Descending
                 *      edition_year Ascending
                 *  operationSort = (-)
                 *      author Descending
                 *      title Descending
                 *      edition_year Ascending
                 */
                lista = $filter('orderBy')(listBooks, [operationSort+'author', '-title', 'edition_year']);
                break;
            case 3:
                /**
                 *  operationSort = (+)
                 *      edition_year Ascending
                 *      author Descending
                 *      title Ascending
                 *  operationSort = (-)
                 *      edition_year Descending
                 *      author Descending
                 *      title Ascending
                 */
                lista = $filter('orderBy')(listBooks,  [operationSort+'edition_year', '-author', 'title']);
                break;
        }    
        return lista;
    }
});

appBooks.controller('BooksCtrl', ['$scope', '$filter', 'sortBooks', function($scope, $filter, sortBooks) {
    $scope.listBooks = [];
    $scope.auxObjectBook = null;

    // inputs sort
    $scope.sort = {
        attributes: [
            {id: '1', name: 'Titles'},
            {id: '2', name: 'Authors'},
            {id: '3', name: 'Edition Year'}
        ],
        types: [
            {id: '+', name: 'Ascending'},
            {id: '-', name: 'Descending'}
        ],
        attributesSelected: {id: '1', name: 'Titles'},
        typesSelected: {id: '+', name: 'Ascending'}
    };

    $scope.openModalConfirmDeleteBook = function(book) {
        $('#modalConfirmDeleteBook').openModal();
        $scope.auxObjectBook = book;
    }

    $scope.confirmDeleteBook = function() {
        var index = $scope.listBooks.indexOf($scope.auxObjectBook);
        $scope.listBooks.splice(index, 1);
        $scope.closeModalConfirmDeleteBook();
    }

    $scope.saveBook = function(book) {
        if ($scope.formulario.$valid) {
            $scope.listBooks.push(angular.copy(book));
            $scope.closeModalAddBook();
            $scope.formulario.$setPristine();
            delete $scope.book;
        }
    }

    $scope.addBook = function(objBook) {
        $scope.listBooks.push(objBook);
    }

    $scope.openModalAddBook = function() {
        $('#modalAddBook').openModal();
    }

    $scope.closeModalAddBook = function() {
        $('#modalAddBook').closeModal();
    }

    $scope.closeModalConfirmDeleteBook = function() {
        $('#modalConfirmDeleteBook').closeModal();
        $scope.auxObjectBook = null;
    }

    $scope.sortBook = function(sort) {
        var attrSort = parseInt(sort.attributesSelected.id, 10);
        var operationSort = sort.typesSelected.id;
        $scope.listBooks = sortBooks($scope.listBooks, attrSort, operationSort);
    }
}]);

//http://plnkr.co/edit/girPFzdi3Zx0yp0ASGVQ?p=preview

//http://jsfiddle.net/M8nDQ/
