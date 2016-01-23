var UndirectedGraph = function(){
  this.graph = {};
};

UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = [];
  },
  
  addEdge : function(source, destination){
    this.graph[source] = this.graph[source] ? this.graph[source].concat(destination) : [destination];
    this.graph[destination] = this.graph[destination] ? this.graph[destination].concat(source) : [source];
  },

  hasEdgeBetween : function(source, destination){
    return (this.graph[source].indexOf(destination) != -1);
  },

  order : function(){
    return Object.keys(this.graph).length;
  },

  size : function(){
    var edges = [];
    for(var vertex in this.graph){
      this.graph[vertex].forEach(function(v){
        var edge = vertex + v;
        var edge2 = v + vertex;
        if(edges.indexOf(edge) == -1 && edges.indexOf(edge2) == -1)
          edges.push(edge);
      })
    };
    return edges.length;
  },

  pathBetween : function(source, destination, visitedPath, allPaths){
    visitedPath = visitedPath || [];
    if(source == destination)
      return visitedPath.concat(source);
    for(var i = 0; i < this.graph[source].length; i++){
      if(visitedPath.indexOf(this.graph[source][i]) == -1){
        var paths = this.pathBetween(this.graph[source][i], destination, visitedPath.concat(source))
        if(paths[paths.length - 1] == destination) return paths;
      };
    }
    return [];
  },

  farthestVertex : function(vertex){
    var count = 0;
    var f_vertex;
    for(var v in this.graph){
      var path_length = this.pathBetween(vertex, v).length;
      if(path_length > count){
        count = path_length;
        f_vertex = v;
      }
    };
    return f_vertex;
  }
};



//--------------------------------------------------------------------------------------------//

var DirectedGraph = function(){
  this.graph = {};
};

DirectedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = [];
  },
  
  addEdge : function(source, destination){
    this.graph[source] = this.graph[source].concat(destination);
  },

  hasEdgeBetween : function(source, destination){
    return (this.graph[source].indexOf(destination) != -1);
  },

  order : function(){
    return Object.keys(this.graph).length;
  },

  size : function(){
    var edges = [];
    for(var vertex in this.graph){
      this.graph[vertex].forEach(function(v){
        var edge = vertex + v;
        if(edges.indexOf(edge) == -1)
          edges.push(edge);
      })
    };
    return edges.length;
  },

  pathBetween : function(source, destination, visitedPath){
    visitedPath = visitedPath || [];
    if(source == destination)
      return visitedPath.concat(source);
    for(var i = 0; i < this.graph[source].length; i++){
      if(visitedPath.indexOf(this.graph[source][i]) == -1){
        var paths = this.pathBetween(this.graph[source][i], destination, visitedPath.concat(source))
        if(paths[paths.length - 1] == destination) return paths;
      };
    }
    return [];
  },

  farthestVertex : function(vertex){
    var count = 0;
    var f_vertex;
    for(var v in this.graph){
      var path_length = this.pathBetween(vertex, v).length;
      if(path_length > count){
        count = path_length;
        f_vertex = v;
      }
    };
    return f_vertex;
  }

};

//--------------------------------------------------------------------------------------------//


var graphs = {UndirectedGraph : UndirectedGraph, DirectedGraph : DirectedGraph};

module.exports = graphs;
