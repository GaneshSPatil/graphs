var graphs = {};

graphs.WeightedGraph = function(){
  this.graph = {};
};

graphs.WeightedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = {};
  },
  
  addEdge : function(edge){
    this.graph[edge.source][edge.destination] =  this.graph[edge.source][edge.destination] 
      ? (this.graph[edge.source][edge.destination].weight > edge.weight) 
        ? edge : this.graph[edge.source][edge.destination]
      : edge;
  },

  shortestPath : function(source, destination){
    var self = this;
    var getNeighbors = function(vertex){
      return Object.keys(self.graph[vertex]);
    };
    
    var isUnknownNodeExist = function(nodes){
      for(var node in nodes){
        if(nodes[node].known == false)
          return true;
      };
    };

    var getMinimalDistanceVertex = function(nodes){
      if(nodes[source].known == false) return nodes[source];
      var temp;
      for(var node in nodes){
        if(!temp){
          if(!nodes[node].known) temp = nodes[node];
        }else if((temp.distance > nodes[node].distance) && !nodes[node].known){
          temp = nodes[node];
        };
      };
      return temp;
    };
    
    var nodes = {};
    Object.keys(this.graph).forEach(function(vertex){
      nodes[vertex] = {};
      nodes[vertex].vertex = vertex;
      nodes[vertex].distance = (vertex == source) ? 0 : Infinity;
      nodes[vertex].parent = undefined;
      nodes[vertex].known = false;
      nodes[vertex].adj = getNeighbors(vertex);
    });


    while(isUnknownNodeExist(nodes)){
      var v = getMinimalDistanceVertex(nodes);
      v.known = true;
      for(var i = 0; i < v.adj.length; i++){
        var w = nodes[v.adj[i]];
        if(!w.known){
          if((v.distance + this.graph[v.vertex][w.vertex].weight) < w.distance){
            w.distance = (v.distance + this.graph[v.vertex][w.vertex].weight);
            w.parent = v;
          };
        };
      };
    };
    
    destination = nodes[destination];
    var path = [];
    while(destination.parent != undefined){
      path.unshift(this.graph[destination.parent.vertex][destination.vertex]);
      destination = destination.parent;
    };
    return path;
  }
};

//------------------------------------------------------------------------------------------------------//

graphs.Edge = function(edgeName, source, destination, weight){
  this.edgeName = edgeName;
  this.source = source;
  this.destination = destination;
  this.weight = weight;
};



//------------------------------------------------------------------------------------------------------//

module.exports = graphs;
