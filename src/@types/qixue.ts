/**
 * @name 奇穴数据
 */

export interface QixueListDTO {
  /**
   * @name 是否不可编辑
   */
  是否不可编辑?: boolean
  /**
   * @name 奇穴详情
   */
  奇穴列表: QixueDataDTO[]
}

/**
 * @name 奇穴数据内容
 */
export interface QixueDataDTO {
  /**
   * @name 奇穴名称
   */
  奇穴名称: string
  /**
   * @name 是否不可编辑
   */
  是否不可编辑?: boolean
  /**
   * @name 奇穴图片
   */
  奇穴图片: string
  /**
   * @name 奇穴加成技能
   */
  奇穴加成技能?: string | '通用'
  /**
   * @name
   */
}
