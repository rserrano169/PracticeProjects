require_relative 'piece_class.rb'
require_relative 'game_class.rb'

class Board

  attr_reader :captured, :board

  def initialize
    @board = Array.new(8) {Array.new(8)}
    place_pieces
    @captured = []
  end

  def place_pieces
    [[0,0],[0,7],[7,0],[7,7]].each do |pos|
      if pos[0] == 0
        self[pos] = Rook.new(pos, self, :black)
      else
        self[pos] = Rook.new(pos, self, :white)
      end
    end

    [[0,1],[0,6],[7,1],[7,6]].each do |pos|
      if pos[0] == 0
        self[pos] = Knight.new(pos, self, :black)
      else
        self[pos] = Knight.new(pos, self, :white)
      end
    end

    [[0,2],[0,5],[7,2],[7,5]].each do |pos|
      if pos[0] == 0
        self[pos] = Bishop.new(pos, self, :black)
      else
        self[pos] = Bishop.new(pos, self, :white)
      end
    end

    [[0,3],[7,3]].each do |pos|
      if pos[0] == 0
        self[pos] = Queen.new(pos, self, :black)
      else
        self[pos] = Queen.new(pos, self, :white)
      end
    end

    [[0,4],[7,4]].each do |pos|
      if pos[0] == 0
        self[pos] = King.new(pos, self, :black)
      else
        self[pos] = King.new(pos, self, :white)
      end
    end

    [1,6].each do |row|
      @board[row].each_index do |col|
        pos = [row,col]
        if pos[0] == 1
          self[pos] = Pawn.new(pos, self, :black)
        else
          self[pos] = Pawn.new(pos, self, :white)
        end
      end
    end

  end


  def in_check?(color)
    king_position = king_position(color)
    in_check = false

    each_piece do |pos|
      if self[pos].color != color
        in_check = true if self[pos].moves.include?(king_position)
      end
    end

    in_check
  end

  def check_mate?(color)
    return false unless in_check?(color)

    check_mate = true

    each_piece do |pos|
      if self[pos].color == color && self[pos].valid_moves.count > 0
        check_mate = false
      end
    end

    check_mate
  end

  def move(start_pos, end_pos)
    raise "You chose an empty square!" if self[start_pos].nil?

    unless self[start_pos].moves.include?(end_pos)
      raise "That piece can't move like that!"
    end

    if self[start_pos].move_into_check?(end_pos)
      raise "That would put you into check!"
    end

    captured << self[end_pos] if !self[end_pos].nil?

    move!(start_pos, end_pos)
  end

  def move!(start_pos, end_pos)
    self[end_pos] = self[start_pos].dup

    self[start_pos] = nil

    self[end_pos].pos = end_pos
  end

  def dup
    dupped_board = Board.new

    each_pos do |pos|
      if self[pos].nil?
        dupped_board[pos] = nil
      else
        dupped_board[pos] = self[pos].dup
        dupped_board[pos].board = dupped_board
      end
    end

    dupped_board
  end

  def display
    render.each do |line|
      puts line
    end

    nil
  end


  def [](pos)
    y, x = pos

    board[y][x]
  end

  def []=(pos, value)
    y, x = pos

    board[y][x] = value
  end

  def each_piece(&prc)
    each_pos { |pos| prc.call(pos) unless self[pos].nil? }
  end

  def each_pos(&prc)
    board.each_index do |row|
      board[row].each_index do |col|
        prc.call([row, col])
      end
    end
  end


  private

    def king_position(color)
      each_pos do |pos|
        if self[pos].class == King && self[pos].color == color
          return pos
        end
      end
    end

    def render_row(row)
      row.map do |piece|
        if piece.nil?
          " "
        else
          piece.render
        end
      end
    end

    def render
      rendered_rows = []

      board.each_with_index do |row, index|
        rendered_rows << [(8 - index), " |", render_row(row)].join(" ")
      end

      rendered_rows << [" " * 4].concat(Array.new(8, "-")).join(" ")
      rendered_rows << [" " * 4].concat(("a".."h").to_a).join(" ")

      rendered_rows
    end


end
