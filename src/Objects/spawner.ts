
function loadSpawner(uniforms: any): THREE.Mesh {
    // Create a GLTFLoader instance to load GLTF resources
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Define parameters for the spawner objects
    const SpawnerParameters = [
        {
            positionX: 0,
            material: 0x0000ff
        },
        {
            positionX: 10,
            material: 0x0000ff
        }
    ];

    // Declare an array to store the loaded mesh objects
    let SpawnerObject: Array<THREE.Mesh> = [];

    // Load a glTF resource
    loader.load(
        // Resource URL
        '../src/Objects/Spawner.gltf',
        // Called when the resource is loaded
        function (gltf) {

            // Iterate through the SpawnerParameters array
            for (let i = 0; i < SpawnerParameters.length; i++) {

                // Check if the loaded GLTF scene contains a valid mesh object
                if (gltf.scene.children.length > 0 && gltf.scene.children[0] instanceof THREE.Mesh) {
                    
                    // Assign the loaded mesh object to the SpawnerObject array at index i
                    SpawnerObject[i] = (gltf.scene.children[0] as THREE.Mesh).clone();
                    // Set the position and rotation of the mesh object
                    SpawnerObject[i].position.set(SpawnerParameters[i].positionX, 9.9, 0);
                    SpawnerObject[i].rotation.x = THREE.MathUtils.degToRad(90);
                    // Assign a new material with the specified color to the mesh object
                    SpawnerObject[i].material = new THREE.MeshBasicMaterial({ color: SpawnerParameters[i].material });

                    // Add the mesh object to the scene
                    scene.add(SpawnerObject[i]);
                }
            }
        },
        // Called while loading is progressing
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Called when loading has errors
        function (error) {
            console.log(`An error happened: ${error}`);
        }
    );