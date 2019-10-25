module.exports = function (sequelize, DataTypes) {
	return sequelize.define('host_settings', {
		host_id: {type: DataTypes.INTEGER.UNSIGNED},
		setting_key: {type: DataTypes.STRING(64)},
		setting_type: {type: DataTypes.STRING(64)},
		setting_value: {type: DataTypes.TEXT},
		createdAt: {field: 'created_at',type: DataTypes.DATE},
		updatedAt: {field: 'updated_at',type: DataTypes.DATE},
		deleted_at: {type: DataTypes.DATE}
	}, {
		tableName: 'host_settings'
	});
};