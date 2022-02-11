// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract LendingContract {

    address immutable admin; // only admin can set
    address immutable borrower; // only admin can set
    address immutable lender; // only admin can set
    address immutable escrow_wallet;  // only admin can set
    uint256 immutable maturity_timestamp; // only admin can set, timestamp before which this contract cant be executed
    uint immutable no_of_tokens; // only admin can set
    bool borrower_paid; // only B can set, default false
    bool lender_received; // only L can set, default false
    string temp_status ="initialized"; // only L can set, default false

    constructor(address b, address l, address escrow, uint256 timestamp, uint token) {
        require(b != l, 'Lender and Borrower address cant be the same');
        admin = msg.sender;
        borrower = b;
        lender = l;
        escrow_wallet = escrow;
        maturity_timestamp = timestamp;
        no_of_tokens = token;
        borrower_paid = false;
        lender_received = false;
    }

    function approve_borrower() external {
        require(borrower == msg.sender, "You're not the borrower");
        borrower_paid = true;
        temp_status = string(abi.encodePacked(temp_status," -> ", "borrower_paid"));
    }

    function approve_lender() external {
        require(lender == msg.sender,  "You're not the lender");
        lender_received = true;
        temp_status = string(abi.encodePacked(temp_status," -> ", "lender_received"));
    }

    // execute below at time execution_timestamp:
    // B: y, L: y -> return; escrow to B    
    // B: n, L: y -> return; escrow to B   
    // B: y, L: n -> dispute? extend maturity_timestamp?
    // B: n, L: n -> defaulted, escrow to L

    function transfer_tokens() external {
        require(admin == msg.sender,  "You're not the admin");
        //require(maturity_timestamp < 0);
        if(lender_received == true){
            //escrow to B 
            temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Borrower"));
        }
        else{
            if(borrower_paid == false){
                // escro to L
                temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Lender"));
            }else{
                // raise dispute
                temp_status = string(abi.encodePacked(temp_status," -> ", "excrow=>Dispute"));
            }
        }
    }

    function get_status() public returns (string memory) {
        return temp_status;
    }

}