'use strict';

/**
 * Get container to draw
 * @param {String} id - container id
 * @return {Element}
 */
const getContainer = (id) => {
    return document.getElementById(id);
}

/**
 * Make a request
 * @param uri
 * @param method
 * @param body
 * @return {*}
 */
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

/**
 * Creates new graph object in provided html container
 * @param {String} containerId - html container id
 * @param {Object} data - formatted data
 * @param {Object} options - graph options
 * @return {Promise}
 */
const createGraph = (containerId, data = {}, options = {}) => {

    const graph = new vis.Network(getContainer(containerId), data, options);
    return Promise.resolve(graph)
}

/**
 * Convert data to proper format
 * @param {Array} nodes - components
 * @param {Array} edges - requests
 * @return {{nodes: *, edges: *}}
 */
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

/**
 * Call data reload and (re)drawing the graph
 */
const reload = () => {

    const dataUrl = window.location.search.substring(1).split('url=')[1]

    getData(dataUrl)
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
}


reload();