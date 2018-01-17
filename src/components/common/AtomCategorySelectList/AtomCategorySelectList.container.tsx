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
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
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
            value: null
        };

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
        const { onChange } = this.props;
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (<option>loading</option>);
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomCategorySelectList">
                <div className="sp-select-container d-flex flex-row">
                    <select value={this.state.value} onChange={onChange}
                            className="sp-select sp-select--md sp-select--input w-100"
                            name="atomCategoryId">
                        <option key="0" value="0">All</option>
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