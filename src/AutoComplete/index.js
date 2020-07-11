import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { KEY_CODES } from './constants';

const Suggestion = ({ suggestion, isActive, onClick }) => {
    return (
        <p className={`sugesstionBox-suggestion ${isActive ? 'active' : ''}`} key={suggestion} onClick={() => onClick(suggestion)} >
            {suggestion}
        </p>
    )
}


const SuggestionBox = ({ suggestions, activeSuggestion, onOptionClick }) => {
    return (<div className="sugesstionBox">
        {suggestions.length > 0 ?
            suggestions.map((suggestion, key) =>
                (<Suggestion isActive={key === activeSuggestion} suggestion={suggestion} onClick={() => onOptionClick(suggestion)} />)
            ) :
            <span>No Data Found</span>
        }
    </div>);
}

class AutoComplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        suggestions: [],
        onChange: () => { },
        placeholder: '',
        className: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            activeSuggestion: 0,
        }
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({ userInput: event.target.value, activeSuggestion: 0, showSuggestions: true });
        this.props.onChange(event.target.value);
    }

    onClear = () => {
        this.setState({ userInput: '', activeSuggestion: 0, showSuggestions: true });
        this.props.onChange('');
    }

    selectElement = (selectedValue) => {
        this.setState({ activeSuggestion: 0, showSuggestions: false, userInput: selectedValue });
        this.props.onChange(selectedValue);
        this.props.onEnter(selectedValue);
    }

    onOptionClick = (selectedValue) => {
        this.selectElement(selectedValue);
    }
    
    onKeyDown = (e) => {
        const { activeSuggestion } = this.state;
        const { suggestions } = this.props;
        if (e.keyCode === KEY_CODES.ENTER) {
            this.selectElement(suggestions[activeSuggestion]);
        } else if (e.keyCode === KEY_CODES.UP && activeSuggestion !== 0) {
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        } else if (e.keyCode === KEY_CODES.DOWN && activeSuggestion !== suggestions.length - 1) {
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
        
        
        const element = document.querySelector('.active');
        if(element) {
            element.scrollIntoView();
        }
        
        
    }

    render() {
        const { activeSuggestion, userInput, showSuggestions } = this.state;
        const { suggestions, placeholder, className } = this.props;
        return (
            <div className={'autocomplete ' + className}>
                {userInput ?
                    <i className="fa fa-times-circle cursor-pointer" onClick={this.onClear} /> :
                    <i className="fa fa-search" />
                }
                <input className='autocomplete-input' type="text" onChange={this.onChange} onKeyDown={this.onKeyDown} value={userInput} placeholder={placeholder} />
                {(showSuggestions && userInput !== '') &&
                    <SuggestionBox onOptionClick={this.onOptionClick} suggestions={suggestions} activeSuggestion={activeSuggestion} />
                }
            </div>
        );
    }
}

export default AutoComplete;

