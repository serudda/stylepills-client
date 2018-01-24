/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_ALL_ATOM_CATEGORIES_QUERY, GetAllResponse } from '../../../models/atomCategory/atomCategory.query';
import { AtomCategory as AtomCategoryModel } from '../../../models/atomCategory/atomCategory.model';

import Icon from '../Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomCategorySelectListProps = {
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
class AtomCategorySelectListContainer 
extends React.Component<ChildProps<AtomCategorySelectListProps & StateProps, GetAllResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomCategorySelectListProps & StateProps, GetAllResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this._handleChange = this._handleChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method _handleChange
     * @example this._handleChange()
     * @private 
     * @param {AtomModel} atom - atom data
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
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
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (
                <div className="AtomCategorySelectList">
                    <div className="sp-select-container d-flex flex-row">
                        <select className="sp-select sp-select--md sp-select--input w-100"
                                name="atomCategoryId">
                            <option value="0" disabled={true}>Loading</option>
                        </select>
                        <Icon icon="chevronDown"
                            iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                            width="15" height="15"/>
                    </div>
                </div>
            );
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomCategorySelectList">
                <div className="sp-select-container d-flex flex-row">
                    <select value={this.state.value} onChange={this._handleChange}
                            className="sp-select sp-select--md sp-select--input w-100"
                            name="atomCategoryId">
                        <option key="0" value="0">Other</option>
                        {data.allAtomCategories.map((atom: AtomCategoryModel) => (
                            <option key={atom.id} value={atom.id}>{atom.name}</option>    
                        ))}
                    </select>
                    <Icon icon="chevronDown"
                        iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                        width="15" height="15"/>
                </div>
            </div>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllAtomCategoriesQuery = graphql<GetAllResponse, AtomCategorySelectListProps>(
    GET_ALL_ATOM_CATEGORIES_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllAtomCategoriesQuery
)(AtomCategorySelectListContainer);