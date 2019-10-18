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

        MyComponent.actualTex;
        MyComponent.actualMat;        
    }

    

    display(){
        if(Array.isArray(this.materials)){
            switch(this.materials[this.graph.currentMaterial%this.materials.length]){
                case 'inherit':
                    MyComponent.actualMat.apply();
                    break;
                default:
                    MyComponent.actualMat = this.materials[this.graph.currentMaterial%this.materials.length]
                    this.graph.materials[this.materials[this.graph.currentMaterial%this.materials.length]].apply();  
                    break;
            }
        }            
        if(Array.isArray(this.texture)){
            MyComponent.actualTex = this.graph.textures[this.texture[0]];
            this.graph.textures[this.texture[0]].bind();
        }
        else{
            switch(this.texture){
                case 'none':
                    if(MyComponent.actualTex != null){
                        MyComponent.actualTex.unbind();
                        MyComponent.actualTex = null;
                    }
                    break;
                case 'inherit':
                    MyComponent.actualTex.bind();
                    break;
                default: 
                    break;
            }
        }

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
