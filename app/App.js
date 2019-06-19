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

export default class App extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            list,
        }

        this.onDismiss = this.onDismiss.bind(this);
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

    render() {
        const { list } = this.state;

        return(
            <div className='App'>
                {list.map((item) => {
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