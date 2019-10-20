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
        MyComponent.length_s;
        MyComponent.length_t;
        MyComponent.actualMat;        
    }

    

    display(){
        
        switch(this.materials[this.graph.currentMaterial%this.materials.length]){
            case 'inherit':
                MyComponent.actualMat.apply();
                break;
            default:
                MyComponent.actualMat = this.graph.materials[this.materials[this.graph.currentMaterial%this.materials.length]];
                MyComponent.actualMat.setTextureWrap('REPEAT', 'REPEAT');
                if(Array.isArray(this.texture)){
                    MyComponent.actualTex = this.graph.textures[this.texture[0]];
                    MyComponent.length_s = this.texture[1];
                    MyComponent.length_t = this.texture[2];
                    MyComponent.actualMat.setTexture(MyComponent.actualTex);
                    
                }
                else{
                    switch(this.texture){
                        case 'none':
                            MyComponent.actualMat.setTexture(null);
                            break;
                        case 'inherit':
                            MyComponent.actualMat.setTexture(MyComponent.actualTex);
                            break;
                        default:
                            break;
                    }
                }
                this.graph.materials[this.materials[this.graph.currentMaterial%this.materials.length]].apply();  
                break;
        }          

        this.graph.scene.pushMatrix();
        for(var key in this.transformations){
            this.graph.scene.multMatrix(this.transformations[key]);
        }
        for(var key in this.children) {
            this.graph.nodes[this.children[key]].changeCoords(MyComponent.length_s, MyComponent.length_t);
            this.graph.nodes[this.children[key]].display();
        }
        this.graph.scene.popMatrix();
    }

    changeCoords(s, t){
        MyComponent.length_s = s;
        MyComponent.length_t = t;
    }
}

