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
        MyComponent.atualMat;        
    }

    

    display(){

        if(Array.isArray(this.materials)){
            MyComponent.atualMat = this.graph.materials[this.materials[0]];
            this.graph.materials[this.materials[0]].apply(); 
        }
        else{
            MyComponent.atualMat = this.graph.materials[this.materials];
            this.graph.materials[this.materials].apply(); 
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
