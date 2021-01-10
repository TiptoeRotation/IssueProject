package com.ibm.cn.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/*
 * id, name, email, uStatus, passwd, signInDate, identity, power, issueId
 * */
public class User {
	private String username;	//用户登陆Id
	private Integer id;			//用户数据库Id
	private String name;		//用户姓名信息
	private String email;		//用户邮箱信息
	private String uStatus;		//用户账号状态
	private String passwd;		//用户密码
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
	private Date   signInDate;	//用户账号注册时间
	private String identity;	//用户身份
	private String  logStatus;  //登录状态
	private Integer issueId;
	//报表变量
    private int CreateINum;		//用户创建issue数
    private int ReceiveINum;	//用户收到issue数
    private int AlterINum;		//用户修改issue数
    private String  IPerCom;		//用户完成率
    
    //分页的参数
  	private int pageNum;		//分页的页数
  	private int pageSize;		//分页的条数
  	
 // 验证码
    private String code;
    
  //总条数
  	private int total;
  	
  	
	
	
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getCreateINum() {
		return CreateINum;
	}
	public void setCreateINum(int createINum) {
		CreateINum = createINum;
	}
	public float getReceiveINum() {
		return ReceiveINum;
	}
	public void setReceiveINum(int receiveINum) {
		ReceiveINum = receiveINum;
	}
	public float getAlterINum() {
		return AlterINum;
	}
	public void setAlterINum(int alterINum) {
		AlterINum = alterINum;
	}
	
	
	public String getLogStatus() {
		return logStatus;
	}
	public void setLogStatus(String logStatus) {
		this.logStatus = logStatus;
	}
	public String getIPerCom() {
		return IPerCom;
	}
	public void setIPerCom(String iPerCom) {
		IPerCom = iPerCom;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getuStatus() {
		return uStatus;
	}
	public void setuStatus(String uStatus) {
		this.uStatus = uStatus;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public Date getSignInDate() {
		return signInDate;
	}
	public void setSignInDate(Date signInDate) {
		this.signInDate = signInDate;
	}
	public String getIdentity() {
		return identity;
	}
	public void setIdentity(String identity) {
		this.identity = identity;
	}
	
	public Integer getIssueId() {
		return issueId;
	}
	public void setIssueId(Integer issueId) {
		this.issueId = issueId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
	
	
	
}
