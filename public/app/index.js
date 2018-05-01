'use strict';



const dataurl = window.location.search.substring(1).split('=')[1]

// create a network
const getContainer = (id) => {
    return document.getElementById(id);
}

const getData = (uri, method = 'GET', body = {}) => {

    if(!uri) {
        return Promise.reject('no uri provided')
    }

    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if(this.status === 200) {
                    return resolve(this.responseText)
                } else {
                    return reject(this.responseText)
                }
            }
        }
        xhttp.open(method, uri, true)
        xhttp.send()
    })

}

const createGraph = (containerId, data = {}, options = {}) => {

    const graph = new vis.Network(getContainer(containerId), data, options);
    return Promise.resolve(graph)
}

const prepareData = (nodes, edges) => {

    nodes = nodes || [
        {id: 'fo-server', label: 'fo-server', group: 'node'},
        {id: 'token-service', label: 'token-service', group: 'node'},
        {id: 'session-service', label: 'session-service', group: 'go'},
        {id: 'platform', label: 'platform', group: 'go'},
        {id: 'mongodb', label: 'mongodb', group: 'database'}
    ];

    edges = edges || [
        {from: 'fo-server', to: 'token-service', color: getEdgeStyle('http'), arrows:'to, from' },
        {from: 'fo-server', to: 'session-service', color: getEdgeStyle('http'), arrows:'to, from' },
        {from: 'fo-server', to: 'platform', color: getEdgeStyle('queue'), arrows:'to, from' },
        {from: 'platform', to: 'mongodb', color: getEdgeStyle('http'), arrows:'to, from' },
    ];

    return { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }
}

getData(dataurl)
    .then(result => {

        const options = {
            nodes: settings.nodes,
            groups: settings.groups,
            edges: settings.edges.options,
            physics: settings.physics
        }

        return createGraph('network', prepareData(result.nodes, result.edges), options);
    })
    .then((graph) => {
        console.log('graph', graph);
    })
    .catch(err => console.log('err', err));
