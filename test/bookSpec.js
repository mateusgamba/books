describe("Descricao", function() {
    var $scope;
    var controller;

    var book1 = {};
    var book2 = {};
    var book3 = {};
    var book4 = {}; 

    var factory = null;
    

    beforeEach(function() {

        module("appBooks");

        inject(function(_$rootScope_, $controller, sortBooks) {
            $scope = _$rootScope_.$new();
            controller = $controller("BooksCtrl", {$scope: $scope});
            factory = sortBooks;
        });
        book1 = {title:'Java How to Program', author:'Deitel & Deitel', edition_year:2007};
        book2 = {title:'Patterns of Enterprise Application Architecture', author:'Martin Fowler', edition_year:2002};
        book3 = {title:'Head First Design Patterns', author:'Elisabeth Freeman', edition_year:2004};
        book4 = {title:'Internet & World Wide Web: How to Program', author:'Deitel & Deitel', edition_year:2007};
        $scope.addBook(book1);
        $scope.addBook(book2);
        $scope.addBook(book3);
        $scope.addBook(book4);
    });

    it("Test Title Ascsending", function() {
        var lista_aux = factory($scope.listBooks, 1, '+');
        
        expect(book3).toEqual(lista_aux[0]);
        expect(book4).toEqual(lista_aux[1]);
        expect(book1).toEqual(lista_aux[2]);
        expect(book2).toEqual(lista_aux[3]);
    });

    it("Test Author Ascending and Title Descending", function() {
        
        var paramnSort = {
            attributesSelected: {id: 2},
            typesSelected: {id: '+'}
        };

        $scope.sortBook(paramnSort);
        
        expect(book1).toEqual($scope.listBooks[0]);
        expect(book4).toEqual($scope.listBooks[1]);
        expect(book3).toEqual($scope.listBooks[2]);
        expect(book2).toEqual($scope.listBooks[3]);
    });

    it("Test Edition Year Descendig, Author Descending and Title Ascending", function() {
        
        var paramnSort = {
            attributesSelected: {id: 3},
            typesSelected: {id: '-'}
        };

        $scope.sortBook(paramnSort);
        
        expect(book4).toEqual($scope.listBooks[0]);
        expect(book1).toEqual($scope.listBooks[1]);
        expect(book3).toEqual($scope.listBooks[2]);
        expect(book2).toEqual($scope.listBooks[3]);
    });

    it("Empty", function() {
        var lista_aux = factory([], 1, '+');
        expect([]).toEqual(lista_aux); 
    });
});
