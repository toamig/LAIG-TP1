/**
 * MyComponent
 * @constructor
 * @param graph - Reference to MyScene graph
 * @param global - Component information
 */
class MyComponent{

    constructor(graph, global){
        this.graph = graph;
        this.transformations = global[0];
        this.materials = global[1];
        this.texture = global[2];
        this.children = global[3];
    }

    display(){

        this.graph.primitives["demoRectangle"].display();
            
        
    }
}
