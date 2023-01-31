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

function SaveDestination(props) {

    const [projects, setProjects] = useState([]);
    const [projectsSet, setProjectsSet] = useState(false);

    useEffect(() => {
        getAllProjects();
    }, []);

    async function getAllProjects() {
        const response = await axios.get(baseUrl + `/getAllProjects?user_id=${props.user_id}`);
        setProjects(response.data);
        props.setNumProjects(response.data.length);
        console.warn(response.data);
        setProjectsSet(true);
    }

    async function getAllFolders(project_id) {
        const folders = await axios.get(baseUrl + `/getFolders?project_id=${project_id}`)
        .then(async(response) => {
            const rootFolder = response.data._id;
            const folders = await axios.get(baseUrl + `/getFolders?project_id=${project_id}`)
        })
        console.warn(response.data);
    }

    function ProjectObject(project) {
        return (
            <TouchableOpacity style={style.projectObjectContainer}>
                <Text style={style.projectName}>{project.project.name}</Text>
            </TouchableOpacity>
        );
    }

    function FolderObject() {
        return (
            <View style={style.folderObjectContainer}>
                <Text>Folder Object</Text>
            </View>
        );
    }

    return (
        <View style={style.saveDestinationContainer}>
            <View style={style.projects}>
                {projects.map((project, i) => (
                    <ProjectObject project={project} key={i}/>
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
});

export default SaveDestination;