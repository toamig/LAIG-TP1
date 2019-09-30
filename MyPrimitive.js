class MyPrimitive{

    constructor(graph, global){
        this.primitive;
        this.graph = graph;
        this.primitiveID = global[0];
        this.type = global[1];
        switch(this.type.nodeName){
            case 'rectangle':
                this.primitive = new MyRectangle(this.graph.scene,this.primitiveID,this.type[0],this.type[1],this.type[2],this.type[3]);
            break;
            case 'triangle':

            break;
            case 'cylinder':

            break;
            case 'sphere':

            break;
            case 'torus':

            break;
        }
    }

    display(){
        this.primitive.display();
    }
}