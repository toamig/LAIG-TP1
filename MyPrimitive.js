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
            case 'cylinder':
                this.primitive = new MyCylinder(this.graph.scene,this.primitiveID,this.type[0],this.type[1],this.type[2],this.type[3],this.type[4]);
                break;
            /*case 'triangle':

                break;
            case 'sphere':

                break;
            case 'torus':

                break;*/
            default: 
                break;

        }
    }

    display(){
        this.primitive.display();
    }
}