const settings = {
    edges: {
        options: { width: 1, },
        colors: {
            'queue': { color: '#ff8000'},
            'http': { color: '#5b5b5b'},
        }
    },
    groups: {
        'node': { color: { background: '#eaf5e9', border: '#026e00', highlight: { background: '#eaf5e9', border: '#026e00' } }},
        'go': { color: { background: '#00bfff', border: '#0080ff', highlight: { background: '#00bfff', border: '#0080ff' }  }},
        'database': { color: { background: '#ffff00', border: '#ffbf00', highlight: { background: '#ffff00', border: '#ffbf00' }  }, shape: 'database'},

    },
    physics: {
        enabled: false,
    },
    nodes: {
        shape: 'box',
        margin: 10,
        widthConstraint: {
            maximum: 200
        }
    },
}


const getEdgeStyle = (name) => {
    return settings.edges.colors[name].color
}