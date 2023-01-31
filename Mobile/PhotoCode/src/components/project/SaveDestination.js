import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var baseUrl = `https://photocode.app:8443`;

function SaveDestination(props) {

    const [projects, setProjects] = useState([]);
    const [projectsSet, setProjectsSet] = useState(false);

    const [folders, setFolders] = useState([]);
    const [folderDepth, setFolderDepth] = useState(0);
    const [folderPath, setFolderPath] = useState([]);

    useEffect(() => {
        props.setFolderDestination(folderPath[folderDepth]);
    }, [folderPath]);

    useEffect(() => {
        getAllProjects();
    }, []);

    async function getAllProjects() {
        const response = await axios.get(baseUrl + `/getAllProjects?user_id=${props.user_id}`);
        setProjects(response.data);
        props.setNumProjects(response.data.length);
        setProjectsSet(true);
    }

    async function getAllFolders(project_id) {
        const folders = await axios.get(baseUrl + `/getFolders`, {
            params: {
                project_id: project_id
            }
        })
        .then(async(response) => {
            const rootFolder = response.data[0]._id;
            setFolderPath([rootFolder]);
            const folders = await axios.get(baseUrl + `/getFolders`, {
                params: {
                    project_id: rootFolder
                }
            })
            .then((response) => {
                return response.data;
            });
            return folders;
        });
        setFolders(folders);
        setFolderDepth(1);
    }

    async function updateFolders(folder_id) {
        const folders = await axios.get(baseUrl + `/getFolders`, {
            params: {
                project_id: folder_id
            }
        })
        .then((response) => {
            return response.data;
        });

        setFolders(folders);
        setFolderPath([...folderPath, folder_id]);
        setFolderDepth(folderDepth + 1);
    }

    async function backFolders() {
        const folders = await axios.get(baseUrl + `/getFolders`, {
            params: {
                project_id: folderPath[folderDepth - 2]
            }
        })
        .then((response) => {
            return response.data;
        });

        setFolders(folders);
        setFolderPath(folderPath.slice(0, folderDepth - 1));
        setFolderDepth(folderDepth - 1);
    }

    function ProjectObject(project) {
        return (
            <TouchableOpacity 
                style={style.projectObjectContainer}
                onPress={() => getAllFolders(project.project._id)}
                >
                <Text style={style.projectName}>{project.project.name}</Text>
            </TouchableOpacity>
        );
    }

    function FolderObject(folder) {
        return (
            <TouchableOpacity 
                style={style.folderObjectContainer}
                onPress={() => updateFolders(folder.folder._id)}
                >
                <Text style={style.folderName}>{folder.folder.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={style.saveDestinationContainer}>
            <View style={style.projects}>
                {(folderDepth != 0 ? 
                    <View>
                        <TouchableOpacity
                            style={style.backPath}
                            onPress={() => backFolders()}
                        >
                            <Text style={style.backPathText}>
                                {'< Back'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                : null)}
                {(folderDepth == 0) ? projects.map((project, i) => (
                    <ProjectObject project={project} key={i}/>
                )) : 
                folders.map((folder, i) => (
                    <FolderObject folder={folder} key={i}/>
                ))}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    saveDestinationContainer: {
        borderRadius: 10,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'black',
    },

    projects: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    currentPath: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'JetBrainsMono-light',
    },

    projectObjectContainer: {
        height: 50,
        width: windowWidth * 0.8,
        borderWidth: 2,
        borderRadius: 10,
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    projectName: {
        fontSize: 20,
        fontFamily: 'JetBrainsMono-light',
    },

    folderObjectContainer: {
        height: 50,
        width: windowWidth * 0.6,
        borderWidth: 2,
        borderRadius: 10,
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    folderName: {
        fontSize: 20,
        fontFamily: 'JetBrainsMono-light',
    },

    backPath: {
        height: 50,
        width: windowWidth * 0.8,
        // borderWidth: 2,
        borderRadius: 10,
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0065FF'
    },

    backPathText: {
        fontSize: 20,
        fontFamily: 'JetBrainsMono-Medium',
        color: 'white',
    }

});

export default SaveDestination;