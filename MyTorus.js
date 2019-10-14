/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 * @param inner - The "tube" radius
 * @param outer - Radius of the "circular axis" of the torus
 * @param slices - Torus slices
 * @param loops - Torus loops
 */

class MyTorus extends CGFobject {
	constructor(scene, id, inner, outer, slices, loops) {
		super(scene);

		this.slices = slices;
		this.loops = loops;
		this.inner = inner;
		this.outer = outer;

		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let varAngleSlices = -2*Math.PI/this.slices;
		let varAngleLoops = 2*Math.PI/this.loops;
		let z = 0;

		for(let i = 0; i <= this.slices; i++) {

			for(let j = 0; j <= this.loops; j++) {
				
				let px = Math.cos(varAngleSlices*i) * (this.outer + this.inner*Math.cos(varAngleLoops*j));
				let py = Math.sin(varAngleSlices*i) * (this.outer + this.inner*Math.cos(varAngleLoops*j)); 
				let pz = Math.sin(varAngleLoops*j) * this.inner;
				
				this.vertices.push(px, py, pz);

				this.normals.push(
					Math.cos(varAngleLoops*j) * Math.cos(varAngleSlices*i), 
                    Math.cos(varAngleLoops*j) * Math.sin(varAngleSlices*i),
                    z
				);

				this.texCoords.push(1 - (i / this.slices), 1 - (j / this.loops));

			}

		}

		for (let i = 1; i <= this.slices; i++) {

			for (let j = 1; j <= this.loops; j++) {
	
				let i1 = (this.loops + 1) * j + i - 1;
				let i2 = (this.loops + 1) * (j - 1) + i - 1;
				let i3 = (this.loops + 1) * (j - 1) + i;
				let i4 = (this.loops + 1) * j + i;
	
				this.indices.push(i1, i2, i4);
				this.indices.push(i2, i3, i4);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
	
	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the torus
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}