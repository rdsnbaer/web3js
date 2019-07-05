import isFunction from 'lodash/isFunction';
import AbstractMethod from '../../../lib/methods/AbstractMethod';

export default class GetSuccessPendingOrderForAddrMethod extends AbstractMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbstractWeb3Module} moduleInstance
     *
     * @constructor
     */
    constructor(utils, formatters, moduleInstance) {
        super('brc_getSuccessPendingOrderForAddr', 5, utils, formatters, moduleInstance);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractWeb3Module} moduleInstance - The package where the method is called from for example Eth.
     */
    beforeExecution(moduleInstance) {
        //this.parameters[0] = this.formatters.inputAddressFormatter(this.parameters[0]);
		//this.parameters[1] = this.formatters.inputAddressFormatter(this.parameters[1]);
		//this.parameters[2] = this.formatters.inputAddressFormatter(this.parameters[2]);

        // Optional second parameter 'defaultBlock' could also be the callback
        if (isFunction(this.parameters[4])) {
            this.callback = this.parameters[4];
            this.parameters[4] = moduleInstance.defaultBlock;
        }

        this.parameters[4] = this.formatters.inputDefaultBlockNumberFormatter(this.parameters[4], moduleInstance);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {BigNumber}
     */
    afterExecution(response) {
        return response;
    }
}
