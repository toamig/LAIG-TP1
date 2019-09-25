class Node{
    constructor(nodeID,transformationIndex,materialsIndex,textureIndex,childrenIndex){
        this.nodeID = nodeID;
        this.transformationIndex = transformationIndex;
        this.materialsIndex = materialsIndex;
        this.textureIndex = textureIndex;
        this.childrenIndex = childrenIndex;
    }

    display(){
        //console.log(this.childrenIndex);
    }
}
