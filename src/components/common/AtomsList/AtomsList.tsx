/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import AtomBox from '../AtomBox/AtomBox.container';
import AtomInfoSection from '../AtomBox/AtomInfoSection/AtomInfoSection';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListProps = {
    atoms: Array<AtomModel>;
};


/**
 * @desc Represent Atoms List
 * @function AtomsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 * TODO: Reestructurar componente ya que este es un componente bobo, y esta llamando a
 * un componente inteligente (AtomBox), y eso no es posible.
 */
const AtomsList: React.SFC<AtomsListProps> = ({ atoms = [] }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomsList row pb-5 m-0 no-gutters">
            <div className="col">
                <div className="d-sm-flex flex-wrap width-wrapper"> 

                    {/* Atom Box */}
                    {atoms.map((atom: AtomModel) => (
                        <div key={atom.id} className="atomBox-container">
                            <AtomBox atom={atom} />
                            <AtomInfoSection {...atom} />
                        </div>
                    ))}

                </div>
            </div>                
        </div>
    );
    
};


/* Export */
export default AtomsList;