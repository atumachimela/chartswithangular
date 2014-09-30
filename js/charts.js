(function(){
	var chartsApp = angular.module('chartsApp',[]);
	chartsApp.controller("appcontroller",['$scope','$http', function($scope,$http){
		var base = "http://ws.audioscrobbler.com/2.0/";
		var config = {
					params: {api_key : 'dc1a93c2536e0b852a301a56303abb92', format : 'json' , callback:'JSON_CALLBACK'}
				};
		 var userinput = "" ;
		 var loading ;
		 $scope.trackheader = true;
		 $scope.artistheader = true;
	    $scope.resett = function()
		{
		 	fetchTopArtists();

		}

		$scope.fetchAll = function() 
		{
			$scope.loading = true;
			$scope.hidetrcks = true;
			$scope.hideartist = true;
			$scope.trackheader = false;
		 	$scope.artistheader = false;

			fetchTopTracksFromLocation ();	

		}
		$scope.loading = true;
		// method that fetches Top Five ARTISTS IN THE WORLD
		fetchTopTracks = function () 
		{	
			config.params.method ='chart.gettoptracks' ;
			config.params.limit = 5;
			$http.jsonp(base,config).success(function(response)
			{	
				$scope.loading = false;
				console.log(response);	
				$scope.trakx = response.tracks.track;
				console.log($scope.trakx);
			});

		};
			// method that fetches Top TEN ARTISTS IN THE WORLD 
		fetchTopArtists = function () 
		{
			config.params.method = 'chart.gettopartists';
			config.params.limit = 10;
			$http.jsonp(base,config).success(function(response)
			{	
				fetchTopTracks();
				console.log(response);
				$scope.artists = response.artists.artist;
				console.log($scope.artists);
				
			});
		};fetchTopArtists();
		// method that fetches Top Five TRACKS FROM A LOCATION
		fetchTopTracksFromLocation = function ()
		{	
			config.params.method ='geo.gettoptracks';
			config.params.country = $scope.userinput;
			config.params.limit = 5;
			$http.jsonp(base,config).success(function(response)
			{	
				$scope.loading = false;
				console.log(response);
				$scope.trackchart = response.toptracks.track; 
				//console.log($scope.trackchart);
				fetchTopArtistsFromLocation ();
			});
			
		}
		// method that fetches Top TEN ARTISTS FROM A LOCATION
		fetchTopArtistsFromLocation = function ()
		{	
			config.params.method ='geo.gettopartists';
			config.params.country = $scope.userinput;
			config.params.limit = 10;
			$http.jsonp(base,config).success(function(response)
			{
				//$scope.loading = false;
				console.log(response);
				$scope.artistchart = response.topartists.artist;
				//console.log($scope.artistchart);
			});
			
		}
			
	}]);

})();

