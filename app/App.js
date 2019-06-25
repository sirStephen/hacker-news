import React from 'react';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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

const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

function isSearched(searchTerm) {
    return function(item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        }

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    setSearchTopStories(result) {
        this.setState({
            result
        })
    }

    componentDidMount() {
        const { searchTerm } = this.state;

        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
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
        const { result, searchTerm } = this.state;
        console.log(this.state)

        if (!result) {
            return null;
        }

        return(
            <div className='page'>
                <div className="interactions">
                    <Search 
                        value={searchTerm}
                        onChange={this.onSearchChange}
                    >
                        Search
                    </Search>
                </div>

                <Table 
                    list={result.hits}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        )
    }
}   

const Search = ({ value, onChange, children }) => 
    <form>
        {children}<input 
            type="text"
            value={value}
            onChange={onChange}    
        />
    </form>

const Table = ({ list, pattern, onDismiss }) => 
    <div className='table'>
    {list.filter(isSearched(pattern)).map((item) => {
            return (
                <div key={item.objectID}
                    className='table-row'
                >
                    <span style={largeColumn}>
                        <a href={item.url}>{item.title}</a>
                    </span>

                    <span style={midColumn}>{item.author}</span>

                    <span style={smallColumn}>{item.num_comments}</span>

                    <span style={smallColumn}>{item.points}</span>

                    <span style={smallColumn}>
                        <Button
                            className='button-inline'
                            onClick={() => onDismiss(item.objectID)}
                        >
                                Dismiss
                        </Button>
                    </span>
                </div>
            );
        })}
    </div>

const Button = ({ onClick, className, children }) => 
    <button
        onClick={onClick}
        className={className}
        type='button'
    >
            {children}
    </button>
