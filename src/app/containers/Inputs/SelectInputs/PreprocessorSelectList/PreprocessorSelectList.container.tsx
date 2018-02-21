/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_ALL_PREPROCESSORS_QUERY, 
    GetAllResponse 
} from './../../../../../models/preprocessor/preprocessor.query';

import SelectList from './../../../../components/Inputs/GenericSelectInput/GenericSelectInput';
import { PreprocessorTypeOptions } from '../../../../../models/preprocessor/preprocessor.model';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreprocessorSelectListProps = {
    onChange: (name: string, value: string) => void
};

/* Own States */
type LocalStates = {
    value: string
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreprocessorSelectListContainer 
extends React.Component<ChildProps<PreprocessorSelectListProps & StateProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<PreprocessorSelectListProps & StateProps, GetAllResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method _handleChange
     * @example this._handleChange()
     * @public 
     * @param {AtomModel} atom - atom data
     * @param {any} e - Event
     * @returns {void}
     */
    handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        
        // VARIABLES
        let value = e.target.value;
        let name = e.target.name;

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        }, () => {
            this.props.onChange(name, value);
        });
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={this.state.value}
                        name="allPreprocessors"
                        isBlock={true}
                        defaultOption="None"
                        options={data.allPreprocessors ? data.allPreprocessors : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this.handleChange}/>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllPreprocessorsQuery = graphql<GetAllResponse, PreprocessorSelectListProps>(
    GET_ALL_PREPROCESSORS_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllPreprocessorsQuery
)(PreprocessorSelectListContainer);