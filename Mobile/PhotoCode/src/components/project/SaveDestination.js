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
        console.warn(response.data);
        setProjectsSet(true);
    }

    function ProjectObject(project) {
        return (
            <TouchableOpacity style={style.projectObjectContainer}>
                <Text>{project.project.name}</Text>
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
            <Text style={style.currentPath}>Choose the project</Text>
            <ScrollView 
                contentContainerStyle={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        height: '100%',
                        width: '100%',
                    }
                }>
                <View style={style.scrollPadding}/>
                {projects.map((project, i) => (
                    <ProjectObject project={project} key={i}/>
                ))}
                <View style={style.scrollPadding}/>

            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    saveDestinationContainer: {
        borderRadius: 10,
        height: windowHeight * 0.17,
        width: windowWidth * 0.9,
        alignSelf: 'center',
        display: 'flex',
        alignContent: 'center',
       
    },

    currentPath: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'JetBrainsMono-light',
    },

    scrollPadding: {
        height: 70,
        width: windowWidth * 0.9,
    },

    projectObjectContainer: {
        height: 50,
        width: windowWidth * 0.8,
        borderWidth: 2,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },
});

export default SaveDestination;