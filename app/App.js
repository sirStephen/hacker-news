import React from 'react';

const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

function isSearched(searchTerm) {
    return function(item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            list,
            searchTerm: ''
        }

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const { list } = this.state;

        const updatedList = list.filter((item) => {
            return item.objectID !== id;
        });

        this.setState({
            list: updatedList
        })

    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        })
    }

    render() {
        const { list } = this.state;

        return(
            <div className='App'>
                <form>
                    <input 
                        type="text"
                        onChange={this.onSearchChange}    
                    />
                </form>

                {list.filter(() => {}).map((item) => {
                    return (
                        <div key={item.objectID}>
                            <span>
                                <a href={item.url}>{item.title}</a>
                            </span>

                            <span>{item.author}</span>

                            <span>{item.num_comments}</span>

                            <span>{item.points}</span>

                            <span>
                                <button
                                    onClick={() => this.onDismiss(item.objectID)}>
                                        Dismiss
                                </button>
                            </span>
                        </div>
                    );
                })}
            </div>
        )
    }
}   
