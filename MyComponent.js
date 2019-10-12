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

        this.graph.scene.pushMatrix();
        for(var key in this.transformations){
            this.graph.scene.multMatrix(this.transformations[key]);
        }
        for(var key in this.children) {
            this.graph.nodes[this.children[key]].display();
        }
        this.graph.scene.popMatrix();
    }
}
