// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract LendingContract {

    address immutable handler; // admin/contract-initiators address
    address immutable borrower; // borrower address
    address immutable lender; // lenders address
    address immutable escrow_wallet;  // escrow-wallet address
    uint256 immutable _created_at; // timestamp before which this contract cant be executed
    uint256 immutable _tenure_delta; // loan tenure in seconds
    uint immutable no_of_tokens; // collateral token amount
    string _token_type; // collateral token type
    bool borrower_paid;
    bool lender_received;
    string temp_status ="initialized"; // contract execution logs
    string status ="initialized"; // contract state

    event StateChange(string);

    constructor(address b, address l, address escrow, uint256 created_at, uint256 tenure_delta, uint token_amount, string memory token_type) {
        require(b != l, 'Lender and Borrower address cant be the same');
        handler = msg.sender;
        borrower = b;
        lender = l;
        escrow_wallet = escrow;
        _created_at = created_at;
        _tenure_delta = tenure_delta;
        no_of_tokens = token_amount;
        _token_type = token_type;
        borrower_paid = false;
        lender_received = false;
    }

    function approve_borrower() external {
        require(borrower == msg.sender, "You're not the borrower");
        borrower_paid = true;
        temp_status = string(abi.encodePacked(temp_status," -> ", "borrower_paid"));
        emit StateChange("Borrower Approved");
    }

    function approve_lender() external {
        require(lender == msg.sender,  "You're not the lender");
        lender_received = true;
        temp_status = string(abi.encodePacked(temp_status," -> ", "lender_received"));
        emit StateChange("Lender Approved");
    }

    function transfer_tokens() external {
        require(handler == msg.sender,  "You're not the contract creator");
        if(lender_received == true){
            temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Borrower"));
            emit StateChange("excrow=>Borrower");
            status = "collateral_returned";
        }
        else{
            if(borrower_paid == false){                
                temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Lender"));
                emit StateChange("excrow=>Lender");
                status = "defaulted";
            }else{                
                temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Dispute"));
                emit StateChange("excrow=>Dispute");
                status = "disputed";
            }
        }
    }

    function get_status() public view returns (string memory) {
        return temp_status;
    }

    function get_contract_state() public view returns (string memory) {
        return status;
    }

}