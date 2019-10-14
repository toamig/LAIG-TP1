/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - Scale of trinangle in X1
 * @param x2 - Scale of trinangle in X2
 * @param x3 - Scale of trinangle in X3
 * @param y1 - Scale of trinangle in Y1
 * @param y2 - Scale of trinangle in Y2
 * @param y3 - Scale of trinangle in Y3
 * @param z1 - Scale of trinangle in Z1
 * @param z2 - Scale of trinangle in Z2
 * @param z3 - Scale of trinangle in Z3
 */
class MyTriangle extends CGFobject {
	constructor(scene, id, x1, y1, z1, x2, y2, z2, x3, y3,z3) {
		super(scene);
		this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
		this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.z1 = z1;
        this.z2 = z2;
        this.z3 = z3;

		this.initBuffers();
	}
	
	initBuffers() {
        this.normals = [];

		this.vertices = [
			this.x1, this.y1, this.z1,	//0
			this.x2, this.y2, this.z2,	//1
			this.x3, this.y3, this.z3,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

        var norm_aux1 = [this.x1 - this.x2, this.y1 - this.y2, this.z1 - this.z2];
        var norm_aux2 = [this.x1 - this.x3, this.y1 - this.y3, this.z1 - this.z3];

        var x_norm = norm_aux1[1]*norm_aux2[2] - norm_aux1[2]*norm_aux2[1];
        var y_norm = norm_aux1[2]*norm_aux2[0] - norm_aux1[0]*norm_aux2[2];
        var z_norm = norm_aux1[0]*norm_aux2[1] - norm_aux1[1]*norm_aux2[0];

        this.normals.push(x_norm,y_norm,z_norm);
        this.normals.push(x_norm,y_norm,z_norm);
        this.normals.push(x_norm,y_norm,z_norm);
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

	   this.texCoords = [
        1, 1,
        0.5, 0,
        0, 1,
        ]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

