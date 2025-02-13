// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {AuthoritySnippet} from "../snippets/Authority.sol";
import {ValidatorManagerSnippet} from "../snippets/ValidatorManager.sol";

abstract contract ValidatorInstaller is AuthoritySnippet, ValidatorManagerSnippet {
    /**
     * @dev Install a validator
     * @param validatorAndData [0:20]: validator address, [20:]: validator data
     */
    function installValidator(bytes calldata validatorAndData) external {
        validatorManagementAccess();
        _installValidator(address(bytes20(validatorAndData[:20])), validatorAndData[20:]);
    }
}
